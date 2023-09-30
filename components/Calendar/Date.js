import moment from "moment"

import Item from "./Item"

export default function Date({ date, rounding, activeMonth }) {
  const items = [
    { name: 1 },
    { name: 2 }
  ]

  return (
    <div
      className={`relative flex-grow ${items.length ? 'bg-gray-300' : 'bg-gray-200'} bg-gray-300 ${!activeMonth && 'opacity-70'} border border-white text-white ${rounding} aspect-square`}
    >
      <div className="flex flex-col p-2">
        <div className="px-1 centerContent lg:justify-start flex-wrap items-end gap-1 opacity-70 text-black">
          <p className="text-2xl">
            {date.format('D')}
          </p>
          <p className="hidden lg:block text-sm pb-[3px] lowercase">
            {date.format('MMMM')}
          </p>
        </div>

        {items.map((i) => {
          return <Item key={i.name} />
        })}
      </div>

      {
        date.isSame(moment(), 'day') && (
          <div className="absolute bottom-0 w-full h-1 bg-accent-500" />
        )
      }
    </div>
  )
}

