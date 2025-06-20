import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import styles from './WorkerGraph.module.css';



const COLORS = ['#31572c', '#FECD2F'];

const RADIAN = Math.PI / 180;

// Кастомная подпись для секторов
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const WorkersGraph = ({ data }) => {
    return (

        <div className={styles.mainGraph}>
            <h3>Статистика по сотрудникам</h3>
            <ResponsiveContainer width={460} height={450}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className={styles.graphTextWrap}>
                <p>Руководители</p>
                <p>Стажеры</p>
            </div>
        </div>

    );
};

export default WorkersGraph;
