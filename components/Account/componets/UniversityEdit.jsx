import React, { useState, useEffect } from 'react';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import InputField from './InputComponent';

const UniversityTab = () => {
  const [universities, setUniversities] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [description, setDescription] = useState('');
  const [departments, setDepartments] = useState([]);
  const [editingUniversityId, setEditingUniversityId] = useState(null);

  useEffect(() => {
    const versityRef = ref(database, 'universities/');

    const unsubscribe = onValue(versityRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const universitiesArray = Object.entries(data).map(([id, university]) => ({
          id,
          ...university,
        }));
        setUniversities(universitiesArray);
      } else {
        console.log('Data not found');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEditClick = (university) => {
    setName(university.title || '');
    setLocation(university.location || '');
    setDescription(university.description || '');
     setImageLink(university.image || '');
    setDepartments(university.departments || []);
    setEditingUniversityId(university.id);
  };

  const handleDeleteClick = async (id) => {
    try {
      await database.ref(`universities/${id}`).remove();
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const universitiesRef = database.ref('universities');
      const newUniversity = {
        name,
        location,
        description,
        departments,
      };

      if (editingUniversityId) {
        // If editing, update the existing university
        await universitiesRef.child(editingUniversityId).update(newUniversity);
        setEditingUniversityId(null); // Reset editing state
      } else {
        // If not editing, add a new university
        await universitiesRef.push(newUniversity);
      }

      setName('');
      setLocation('');
      setDescription('');
      setDepartments([]);
    } catch (error) {
      console.error('Error submitting university:', error);
    }
  };

  const handleAddDepartment = () => {
    setDepartments([...departments, '']); 
  };

  const handleRemoveDepartment = (index) => {
    const updatedDepartments = [...departments];
    updatedDepartments.splice(index, 1);
    setDepartments(updatedDepartments);
  };

  const handleDepartmentChange = (index, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index] = value; 
    setDepartments(updatedDepartments);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">University Tab</h3>

      <form onSubmit={handleSubmit} className='justify-center'>
         <InputField label={"Name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
        <InputField  label={"Location"} type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <InputField  label={"Image Link"} type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
       <InputField label={ "Description"} type={"textarea"} value={description} onChange={(e) => setDescription(e.target.value)}  />

        <div >
          <h4  className="text-xl font-semibold mb-4">Departments:</h4>
          {departments.map((dept, index) => (
            <div key={index}>
              
              <InputField label={"Department"} type="text"
                value={dept}
                onChange={(e) => handleDepartmentChange(index, e.target.value)} />
            
              <button type="button"   className={`relative  text-sm transition duration-300 text-green-400 bg-black   rounded-md px-7 py-2 mt-5`}onClick={() => handleRemoveDepartment(index)}>
                Remove
              </button>
            </div>
          ))}
          <button  className={`relative  text-sm transition duration-300 text-green-400 bg-black   rounded-md px-7 py-2 mt-5`} type="button" onClick={handleAddDepartment}>
            Add Department
          </button>
        </div>

        <button  className={`relative  text-sm transition duration-300 text-green-400 bg-black   rounded-md px-7 py-2 mt-5`}  type="submit">Submit</button>
      </form>

      <ul>
        {universities.map((university) => (
          <li key={university.id}>
          {university.id}  -  {university.title} - {university.location}
            <button  className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-1 mt-5`} onClick={() => handleEditClick(university)}>Edit</button>
            <button  className={`relative  text-sm ml-5 mr-5 transition duration-300 text-green-400 bg-black   rounded-md px-5 py-1 mt-5`} onClick={() => handleDeleteClick(university.id)}>Delete</button>
            <div className='mt-5'>
              Departments: {university.departments && university.departments.join(', ')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityTab;
