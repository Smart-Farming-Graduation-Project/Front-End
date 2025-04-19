const Dashboard = () => {
  return (
    <div className="flex-1 ">
      <div className="p-2 mt-12 md:mt-0">
        <h1 className="text-2xl font-bold ">Dashboard</h1>
        <span className="block h-1 w-14 bg-green rounded-lg"></span>
      </div>
      <div className="mt-4">
        <div className="mb-4"></div>
        <div className="grid-container grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg  min-h-screen">
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
          <div className="bg-gradient-to-r from-[#033d20] to-green rounded-lg shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
