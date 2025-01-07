import  { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaGripVertical, FaBox } from "react-icons/fa";

type MoveItemFunction = (draggedIndex: number, destinationIndex: number) => void;
interface Item {
    title: string;
    description: string;
    category: string;
  }

const DraggableItem = ({ id, index, item, moveItem }: { id: number, index: number, item: Item, moveItem: MoveItemFunction }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center p-4 mb-3 bg-gray-800 rounded-lg shadow-md cursor-move transition-all duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <FaGripVertical className="mr-4 text-gray-400" />
      <div className="flex items-center flex-1">
        <div className="p-2 mr-4 bg-gray-700 rounded-md">
          <FaBox className="text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-200">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
      </div>
      <span className="px-3 py-1 text-sm text-blue-400 bg-gray-700 rounded-full">
        {item.category}
      </span>
    </div>
  );
};

const DragAndDropList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Project Planning",
      description: "Strategic planning and roadmap development",
      category: "Planning",
    },
    {
      id: 2,
      title: "Design System",
      description: "UI/UX design system components",
      category: "Design",
    },
    {
      id: 3,
      title: "Development Sprint",
      description: "Frontend implementation and testing",
      category: "Development",
    },
    {
      id: 4,
      title: "Quality Assurance",
      description: "Testing and bug fixes",
      category: "Testing",
    },
  ]);

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = items[dragIndex];
    const newItems = [...items];
    newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Task Manager</h2>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                Drag and drop to reorder tasks
              </h3>
              <p className="text-gray-400">
                Use the handle on the left to drag items and reorganize your task list
              </p>
            </div>
            <div className="space-y-2">
              {items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  item={item}
                  moveItem={moveItem}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDropList;
