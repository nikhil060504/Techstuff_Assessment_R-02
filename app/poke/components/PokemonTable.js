function PokemonTable({ data, startNum, onSelect, selectedUrl }) {
  if (!data?.length) return null;

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-3 w-16">#</th>
            <th className="p-3">Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.name}
              onClick={() => onSelect(item.url)}
              className={`border-b border-gray-100 cursor-pointer hover:bg-blue-50 ${
                selectedUrl === item.url ? "bg-blue-100" : ""
              }`}
            >
              <td className="p-3 text-gray-500">{startNum + i}</td>
              <td className="p-3 font-medium capitalize">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTable;
