import React from 'react'
import { useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables)

const chartValues = {
    Student: 'Student',
    Income: 'Income',
}

//#####################################################//
//########### COMPONENTS ARE RESPONSIVE:YES ###########//
//#####################################################//

function InstructorChart({ courses, currChart }) {


    function getRandomColors(numColors) {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            colors.push(color)
        }
        return colors;
    }

    //data for chart displaying student info

    console.log('courses: ',courses)

    const chartDataForStudents = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalStudentsEnrolled),
                backgroudColor: getRandomColors(courses?.length)
            }
        ]
    }

    //data for chart diplaying income data
    const chartDataForIncome = {
        labels: courses?.map((course) => course?.courseName),
        datasets: [
            {
                data: courses?.map((course) => course?.totalAmountGenerated),
                backgroudColor: getRandomColors(courses?.length)
            }
        ]
    }

    //options
    const options = {

    }

    return (
        <div>
            <Pie
                data={currChart === chartValues.Student ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>
    )
}

export default InstructorChart
