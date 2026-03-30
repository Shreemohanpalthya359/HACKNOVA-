const Card = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
        {value}
      </h2>
    </div>
  );
};

export default Card;