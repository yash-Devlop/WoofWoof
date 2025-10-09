import { useState } from "react";

export default function ColorPicker({ onAddColor }) {
  const [colorCode, setColorCode] = useState("#000000");
  const [colorName, setColorName] = useState("");

  const handleAdd = () => {
    if (!colorName) {
      alert("Please enter a color name");
      return;
    }
    onAddColor({ name: colorName, code: colorCode });
    setColorName("");
    setColorCode("#000000");
  };

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg">
      <label className="font-semibold">Add Product Color</label>

      <div className="flex items-center gap-3">
        <input
          type="color"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
          className="w-12 h-12 rounded-full border cursor-pointer"
        />
        <input
          type="text"
          placeholder="Color Name (e.g. Sky Blue)"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          className="border p-2 rounded-md w-1/2"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-[#ff0047] text-white px-4 py-2 rounded-lg hover:bg-[#e00040]"
        >
          Add
        </button>
      </div>
    </div>
  );
}
