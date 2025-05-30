// components/CircularProgress.tsx
import React from 'react';
import styles from './ProgressDiagramm.module.css';


const ProgressDiagramm = ({
    percentage,
    size = 120,
    strokeWidth = 12,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={styles.wrapper}>
            <svg width={size} height={size}>
                <circle
                    className={styles.bg}
                    stroke="#d3d3d3"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={styles.progress}
                    stroke="#4cd964"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="bold"
                    fill="#000"
                >
                    {percentage}%
                </text>
            </svg>
        </div>
    );
};

export default ProgressDiagramm;
