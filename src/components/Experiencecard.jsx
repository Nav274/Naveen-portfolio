
const Educationcard = ({ company, role, duration, location, desc}) => (

  <div className="bg-white shadow-md rounded-xl p-6 mb-6">

    <h3 className="text-xl font-semibold text-black">{company}</h3>
    <p className="text-gray-700 mb-4">{role}</p>
    <div className="flex justify-between items-center flex-wrap">
      <p className="text-gray-600">{duration}</p>
      <p className="text-gray-600">{location}</p>
    </div>
     
      <div className="mt-4 inline-block bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-md shadow">
         {desc}
      </div>

</div>
);

export default Educationcard;