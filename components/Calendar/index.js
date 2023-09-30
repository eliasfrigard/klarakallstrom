import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Date from './Date'
import { getDayNumber } from '../helpers/moment'

import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'

export default function Calendar() {
  const [month, setMonth] = useState(moment())
  const [dates, setDates] = useState([])

  const handleSubtractMonth = () => {
    setMonth(moment(month).subtract(1, 'months'))
  }

  const handleAddMonth = () => {
    setMonth(moment(month).add(1, 'months'))
  }

  useEffect(() => {
    const getDatesInMonth = (momentDate) => {
      const daysInMonth = momentDate.daysInMonth()

      const allDates = []

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = moment(momentDate).date(day)
        allDates.push(currentDate)
      }

      return allDates
    }

    const currentMonthDates = getDatesInMonth(month)


    const startPadding = getDayNumber(currentMonthDates[0])
    const endPadding = 7 - getDayNumber(currentMonthDates[currentMonthDates.length - 1]) - 1

    let startPaddingDates = []
    let endPaddingDates = []

    if (startPadding) {
      const previousMonth = moment(month).subtract(1, 'months')
      startPaddingDates = getDatesInMonth(previousMonth)
      startPaddingDates = startPaddingDates.slice(Math.max(startPaddingDates.length - startPadding, 0))
    }


    if (endPadding) {
      const nextMonth = moment(month).add(1, 'months')
      endPaddingDates = getDatesInMonth(nextMonth)
      endPaddingDates = endPaddingDates.slice(0, endPadding)
    }
    setDates([...startPaddingDates, ...currentMonthDates, ...endPaddingDates])
  }, [month])

  const roundedClass = (index) => {
    const rows = Math.ceil(dates.length / 7)
    const firstBoxLastRow = 7 * (rows - 1)

    if (index === 0) {
      return 'rounded-tl-md'
    }
    if (index === 6) {
      return 'rounded-tr-md'
    }
    if (index === firstBoxLastRow) {
      return 'rounded-bl-md'
    }
    if (index === dates.length - 1) {
      return 'rounded-br-md'
    }
    return ''
  }

  return (
    <div className="container mx-auto py-16">
      <div className='w-full centerContent mb-4'>
        <BsChevronDoubleLeft onClick={() => handleSubtractMonth()} className='text-xl antialiased opacity-50 hover:opacity-70 hover:cursor-pointer duration-200' />
        <div className='text-center w-[200px]'>
          <p className='text-2xl font-bold opacity-50 tracking-wider'>{month.format('YYYY').toUpperCase()}</p>
          <p className='text-xl font-bold opacity-50 tracking-wider'>{month.format('MMMM').toUpperCase()}</p>
        </div>
        <BsChevronDoubleRight onClick={() => handleAddMonth()} className='text-xl antialiased opacity-50 hover:opacity-70 hover:cursor-pointer duration-200' />
      </div>
      <div className="grid grid-cols-7 centerContent">
        {Array.from({ length: 7 }, (_, index) => {
          return (
            <div key={index} className='w-full centerContent py-2'>
              <p className='hidden lg:block font-bold uppercase opacity-30 tracking-wider'>
                {moment().day(index + 1).format('dddd')}
              </p>
              <p className='lg:hidden font-bold uppercase opacity-30 tracking-wider'>
                {moment().day(index + 1).format('dd')}
              </p>
            </div>
          )
        })}
        {Array.from({ length: dates.length }, (_, index) => {
          return (
            <Date
              key={index}
              date={dates[index]}
              activeMonth={month.month() === dates[index].month()}
              rounding={roundedClass(index)}
            />
          )
        })}
      </div>
    </div>
  )
}
