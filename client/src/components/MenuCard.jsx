export default function MenuCard({ item, onAdd }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
        flex
        flex-col
        group
      "
    >
      {/* Image */}
      <div className="h-40 overflow-hidden">
        <img
          src={item.image || "https://via.placeholder.com/300"}
          alt={item.name}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition
            duration-300
          "
        />
      </div>

     
      <div className="p-4 flex flex-col flex-1">

        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-1">
          {item.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {item.description}
        </p>

        {/* Bottom section */}
        <div className="mt-auto flex items-center justify-between pt-3">

          
          <span className="text-lg font-bold text-green-600">
            ₹{item.price}
          </span>

          <button
            onClick={() => onAdd(item)}
            className="
              bg-black
              text-white
              px-4
              py-1.5
              rounded-lg
              hover:bg-gray-800
              active:scale-95
              transition
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
