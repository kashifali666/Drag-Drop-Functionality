import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import logo from "../assets/Rectangle 112.png";
import { BiSearch } from "react-icons/bi";
import { FaBell, FaUser } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri";
import { MdOutlineGroupAdd, MdOutlineDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { GiTeamIdea } from "react-icons/gi";
import { AiOutlineDrag } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

// Draggable List Item for the Team Panels
const DraggableItem = ({
  drill,
  index,
  moveItem,
  deleteDrill,
  showDeleteIcon,
}) => {
  const [, drag] = useDrag({
    type: "DROPPED_DRILL",
    item: { index, drill },
  });

  const [, drop] = useDrop({
    accept: "DROPPED_DRILL",
    hover: (item) => {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      className="flex items-center p-2 bg-white shadow rounded border text-xs cursor-move"
    >
      <AiOutlineDrag className="text-black mr-2" />
      <span>{drill}</span>
      {showDeleteIcon && (
        <AiOutlineDelete
          onClick={() => deleteDrill(index)}
          className="ml-auto text-black font-bold hover:text-black cursor-pointer"
        />
      )}
    </li>
  );
};

// Team Panel Drop Area
const TeamDropArea = ({ title, drills, setDrills }) => {
  const [, drop] = useDrop({
    accept: "DROPPED_DRILL",
    drop: (item) => {
      // Check if the drill already exists in the drills list
      if (!drills.includes(item.drill)) {
        setDrills((prev) => [...prev, item.drill]);
      }
    },
  });

  const moveItem = (fromIndex, toIndex) => {
    setDrills((prev) => {
      const updatedDrills = [...prev];
      const [removed] = updatedDrills.splice(fromIndex, 1);
      updatedDrills.splice(toIndex, 0, removed);
      return updatedDrills;
    });
  };

  const deleteDrill = (index) => {
    setDrills((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div
      ref={drop}
      className="bg-gray-100 p-4 rounded shadow-md border border-dashed border-gray-300 w-full"
    >
      <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
      {drills.length > 0 ? (
        <ul className="space-y-2">
          {drills.map((drill, index) => (
            <DraggableItem
              key={index}
              drill={drill}
              index={index}
              moveItem={moveItem}
              deleteDrill={deleteDrill}
              showDeleteIcon={true}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">Drag drills here to assign</p>
      )}
    </div>
  );
};

// Main CoachingPage Component
const CoachingPage = () => {
  const [rookiesDrills, setRookiesDrills] = useState([]);
  const [boostersDrills, setBoostersDrills] = useState([]);

  const drills = [
    "12 Pull Ups 4 Repetitions For 1 Minute",
    "10 Chin Ups 3 Repetitions For 1 Minute",
    "12 Burpees 4 Repetitions For 1 Minute",
    "8 Take Downs 4 Repetitions For 1 Minute",
    "6 Burpees 4 Repetitions For 1 Minute",
    "8 Grinders Grip 4 Repetitions for 1 Minute",
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col min-h-screen bg-gray-100 font-poppins">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md sm:px-6">
          <img src={logo} alt="Logo" className="h-10 sm:h-12" />
          <div className="relative max-w-md flex-grow">
            <BiSearch className="absolute left-2 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search Coaches / Schools"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <FaBell className="text-gray-600 text-lg" />
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600 text-lg" />
              <span className="font-medium text-blue-500 text-sm sm:text-base">
                Starc | Head Coach
              </span>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-col sm:flex-row flex-1 mt-2 ml-2 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Sidebar */}
          <aside className="w-full sm:w-40 bg-white shadow-md rounded-sm max-h-[450px]">
            <nav className="space-y-3">
              {[
                { icon: <MdOutlineDashboard />, label: "Dashboard" },
                { icon: <RiProfileLine />, label: "View Profile" },
                { icon: <GiTeamIdea />, label: "Practice Plans" },
                { icon: <CiCalendar />, label: "Calendar" },
                { icon: <IoIosFitness />, label: "Add Drills" },
                { icon: <MdOutlineGroupAdd />, label: "Add Coach" },
                { icon: <RiTeamLine />, label: "Add Teams" },
                { icon: <IoSettingsOutline />, label: "View Settings" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-gray-600 hover:text-blue-500 cursor-pointer"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex flex-col sm:flex-row flex-1 space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Drills Section */}
            <section className="w-full sm:w-64 bg-white shadow-md rounded-sm p-2 h-[450px]">
              <input
                type="text"
                placeholder="Search Drills"
                className="w-full border border-gray-300 rounded-md p-2 text-xs mb-4"
              />
              <ul className="space-y-4 text-xs">
                {drills.map((drill, idx) => (
                  <DraggableItem
                    key={idx}
                    drill={drill}
                    showDeleteIcon={false}
                  />
                ))}
              </ul>
            </section>

            {/* Team Panels */}
            <section className="w-full sm:flex-1">
              <div className="flex sm:space-x-4 mb-4 flex-col sm:flex-row">
                {/* Team Rookies */}
                <TeamDropArea
                  title="Team Rookies"
                  drills={rookiesDrills}
                  setDrills={setRookiesDrills}
                />

                {/* Team Boosters */}
                <TeamDropArea
                  title="Team Boosters"
                  drills={boostersDrills}
                  setDrills={setBoostersDrills}
                />
              </div>
            </section>
          </main>
        </div>

        {/* Footer */}
        <footer className="text-center py-4">
          <p className="text-sm text-gray-500">All rights reserved © 2024</p>
        </footer>
      </div>
    </DndProvider>
  );
};

export default CoachingPage;
