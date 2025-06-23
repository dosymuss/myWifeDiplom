import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCompanies, updateCompany, updateCompanyInterns, updateCompanyTasks } from "../api/company";



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
                const { companies, updateCompanyInterns } = get();

                const companyId = localStorage.getItem("companyId");
                const company = companies?.find(c => c.id === companyId);
                if (!company) return;

                const intern = company.interns?.find(i => i.id === internId);
                if (!intern) return;

                // Если уже есть workTask — ничего не делаем
                const hasWorkTask = intern.workTask && Object.keys(intern.workTask).length > 0;
                if (hasWorkTask) return;

                // Ищем первую задачу, у которой статус не "close"
                const firstOpenTask = (intern.tasks || []).find(task => task.status !== 'close');
                if (!firstOpenTask) return;

                const updatedIntern = {
                    ...intern,
                    workTask: firstOpenTask
                };

                // Используем твою новую функцию обновления
                await updateCompanyInterns(internId, updatedIntern);

                // Обновим в состоянии
                const updatedCompanies = companies.map(c =>
                    c.id === companyId
                        ? {
                            ...c,
                            interns: c.interns.map(i => i.id === internId ? updatedIntern : i)
                        }
                        : c
                );

                set({ companies: updatedCompanies });

            } catch (err) {
                console.error("Ошибка при назначении workTask:", err);
            }
        },


        updateCompanyInterns: async (internId, updatedIntern) => {
            try {
                const companies = get().companies;

                console.log(internId);
                console.log(updatedIntern);

                const companyId = localStorage.getItem("companyId")

                // Обновляем интерна в соответствующей компании
                const company = companies?.find(item => item?.id === companyId)


                const otherInter = company?.interns?.filter(item => item?.id !== updatedIntern.id)

                const interns = [...otherInter, updatedIntern]

                const queryCompany = {
                    ...company,
                    interns: interns
                }
                // Сохраняем обновленные данные в хранилище

                // Отправляем обновленные данные на сервер
                const res = await updateCompany(companyId, queryCompany);

                console.log("Интерн обновлен на сервере", res);

            } catch (err) {
                console.error("Ошибка при обновлении данных интерна:", err);
                throw err;
            }
        }

    })
))