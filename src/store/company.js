import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCompanies, updateCompanyInterns, updateCompanyTasks } from "../api/company";



export const useCompany = create(devtools(
    (set, get) => ({
        companies: [],
        getCompanyStatus: "",
        getCompanyErr: "",
        fetchGetCompany: async () => {
            try {
                set({ getCompanyStatus: "pending" })
                const res = await getCompanies()

                set({ companies: res })
                set({ getCompanyStatus: "fulfilled" })

            } catch (error) {
                set({ companyStatus: "rejected" })
                set({ getCompanyStatus: error?.message })
            }
        },
        deleteTask: async (taskId) => {
            try {
                const updatedCompanies = get().companies.map(company => {
                    const hasTask = (company.tasks || []).some(task => task.id === taskId);

                    if (!hasTask) return company;

                    const updatedTasks = company.tasks.filter(task => task.id !== taskId);

                    // Обновляем сервер
                    updateCompanyTasks(company.id, updatedTasks);

                    return {
                        ...company,
                        tasks: updatedTasks
                    };
                });

                set({ companies: updatedCompanies });

            } catch (err) {
                console.error("Ошибка при удалении задачи", err);
            }
        },
        updateTask: async (updatedTask) => {
            try {
                let response;

                const updatedCompanies = await Promise.all(
                    get().companies.map(async company => {
                        const hasTask = (company.tasks || []).some(task => task.id === updatedTask.id);
                        if (!hasTask) return company;

                        const updatedTasks = company.tasks.map(task =>
                            task.id === updatedTask.id ? updatedTask : task
                        );

                        // Обновляем сервер и дожидаемся ответа
                        response = await updateCompanyTasks(company.id, updatedTasks);

                        return {
                            ...company,
                            tasks: updatedTasks
                        };
                    })
                );

                set({ companies: updatedCompanies });

                return response; // <-- теперь возвращаем
            } catch (err) {
                console.error("Ошибка при обновлении задачи", err);
                throw err;
            }
        },
        assignTaskToIntern: async (internId, taskId) => {
            try {
                const companies = get().companies;

                const updatedCompanies = await Promise.all(companies.map(async company => {
                    const updatedInterns = (company.interns || []).map(intern => {
                        if (intern.id === internId) {
                            const alreadyAssigned = (intern.tasks || []).some(task => task.id === taskId);

                            const updatedTasks = alreadyAssigned
                                ? intern.tasks
                                : [
                                    ...(intern.tasks || []),
                                    {
                                        id: taskId,
                                        url: "",
                                        mark: null,
                                        status: "open"
                                    }
                                ];

                            return {
                                ...intern,
                                tasks: updatedTasks
                            };
                        }

                        return intern;
                    });

                    const hasTargetIntern = (company.interns || []).some(i => i.id === internId);
                    if (hasTargetIntern) {
                        await updateCompanyInterns(company.id, updatedInterns);
                        return { ...company, interns: updatedInterns };
                    }

                    return company;
                }));

                set({ companies: updatedCompanies });
            } catch (err) {
                console.error("Ошибка при назначении задачи стажеру:", err);
            }
        },
        deleteIntern: async (companyId, internId) => {
            try {
                const companies = get().companies;

                const updatedCompanies = companies.map(company => {
                    if (company.id === companyId) {
                        const updatedInterns = (company.interns || []).filter(i => i.id !== internId);
                        updateCompanyInterns(company.id, updatedInterns); // API-запрос
                        return { ...company, interns: updatedInterns };
                    }
                    return company;
                });

                set({ companies: updatedCompanies });
            } catch (err) {
                console.error("Ошибка при удалении стажёра:", err);
            }
        },
        assignWorkTaskIfEmpty: async (internId) => {
            try {
                const { companies } = get();



                const updatedCompanies = await Promise.all(
                    companies.map(async (company) => {
                        const hasIntern = (company.interns || []).some(i => i.id === internId);

                        if (!hasIntern) return company;

                        const updatedInterns = company.interns.map(intern => {
                            if (intern.id !== internId) return intern;

                            // Проверяем, если workTask уже есть, не делаем изменений
                            const hasWorkTask = intern.workTask && Object.keys(intern.workTask).length > 0;

                            if (!hasWorkTask) {
                                // Ищем первую задачу с открытым статусом
                                const firstOpenTask = (intern.tasks || []).find(task => task.status !== 'close');

                                console.log(firstOpenTask);


                                if (firstOpenTask) {
                                    return {
                                        ...intern,
                                        workTask: firstOpenTask
                                    };
                                }
                            }

                            // Если workTask уже назначена или нет открытых задач
                            return intern;
                        });

                        await updateCompanyInterns(company.id, updatedInterns);
                        return { ...company, interns: updatedInterns };
                    })
                );

                set({ companies: updatedCompanies });

            } catch (err) {
                console.error("Ошибка при обновлении workTask:", err);
            }
        },

        updateCompanyInterns: async (internId, updatedIntern) => {
            try {
                const companies = get().companies;

                console.log(internId);
                console.log(updatedIntern);

                const companyId = localStorage.getItem("companyId")

                // Обновляем интерна в соответствующей компании
                const updatedCompanies = companies.map(company => {
                    const updatedInterns = company.interns.map(intern => {
                        if (intern.id === internId) {
                            return updatedIntern; // Заменяем интерна на обновленного
                        }
                        return intern; // Оставляем других интернов без изменений
                    });

                    return { ...company, interns: updatedInterns };
                });

                // Сохраняем обновленные данные в хранилище

                // Отправляем обновленные данные на сервер
                const res = await updateCompanyInterns(companyId, updatedIntern);

                console.log("Интерн обновлен на сервере", res);

            } catch (err) {
                console.error("Ошибка при обновлении данных интерна:", err);
                throw err;
            }
        }

    })
))