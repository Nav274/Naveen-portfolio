
const Educationcard = ({ degree, university, duration, location, cgpa }) => (

  <div className="bg-white shadow-md rounded-xl p-6 mb-6 text-black">

    <h3 className="text-xl font-semibold ">{degree}</h3>
    <p className="text-gray-700 mb-4">{university}</p>
    <div className="flex justify-between items-center flex-wrap">
      <p className="text-gray-600">{duration}</p>
      <p className="text-gray-600">{location}</p>
    </div>
    {cgpa && (
      <div className="mt-4 inline-block bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-md shadow">
        CGPA: {cgpa}
      </div>

    )}

</div>
);

export default Educationcard;
