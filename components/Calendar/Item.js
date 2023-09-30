export default function Item({ item }) {
  return (
    <div
      className={`hidden lg:block w-full px-2 py-[2px] my-1 bg-gray-500 rounded bg-opacity-80 hover:bg-opacity-100`}
    >
      <p className="text-xs break-all">
        Some descriptive text
      </p>
    </div>
  )
}

