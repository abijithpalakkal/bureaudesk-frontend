import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import fetchData from '../../utils/fetchdata';
import postData from '../../utils/postdata';

interface Employee {
  _id: string;
  Name: string;
  email: string;
  position: string;
}

interface Props {
  id: string;
  modal:any
}


function Createteammodal({ id ,modal}: Props) {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState<string | null>(null);
  const [teamname, setTeamname] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function getEmployees() {
      try {
        const response = await fetchData(`/user/getdepartmentemployee/${id}`);
        setEmployee(response.data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
    getEmployees();
  }, [id]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const memberId = event.target.value;
    if (event.target.checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    }
  };

  const handleTeamLeadChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamLead(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedMembers.length < 2) {
      alert('Please select at least two members');
    } else if (!selectedTeamLead) {
      alert('Please select a team lead');
    } else {


      console.log('Selected Members:', selectedMembers);
      console.log('Selected Team Lead:', selectedTeamLead);
      await postData('/company/createteam', {
        members: selectedMembers,
        teamlead: selectedTeamLead,
        name: teamname,
        description: description,
        departmentid:id
      });
    modal(false)
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center h-screen">
        <div className="inset-0 bg-black  opacity-50 relative h-full w-full"></div>
        <div className="bg-white rounded-lg shadow-2xl p-6 absolute ">
          <div className="bg-blue-600 w-6 h-6 rounded-md flex justify-center items-center border border-black" onClick={()=>{modal(false)}}>
            <BiArrowBack />
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Create Team</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="companyName" className="mb-1">
                Team name
              </label>
              <input
                type="text"
                id="companyName"
                value={teamname}
                onChange={e => setTeamname(e.target.value)}
                required
                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="border border-blue-600 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="mb-4 h-50 border-2 border-blue-500 overflow-scroll mt-1 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700">Select Members</label>
              {employee?.map(employee => (
                <div key={employee._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={employee._id}
                    value={employee._id}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={employee._id} className="text-black mt-1">
                    <div className="border-2 border-black rounded-lg p-2">
                      <p>{employee.Name}</p>
                      <p>{employee.email}</p>
                      <p>{employee.position}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor="teamLead" className="block text-sm font-medium text-gray-700">
                Select Team Lead
              </label>
              <select
                id="teamLead"
                value={selectedTeamLead || ''}
                onChange={handleTeamLeadChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select Team Lead</option>
                {employee
                  .filter(emp => selectedMembers.includes(emp._id))
                  .map(employee => (
                    <option key={employee._id} value={employee._id}>
                      <p>{employee?.Name}</p>
                      <p>{employee?.email}</p>
                    </option>
                  ))}
              </select>
            </div>

            <div><p><span >•</span>The employees will be having <span className='text-blue-600'>basic_node permission</span>.you can later set manager for each department.Initially add manager as employee.</p></div>
            <div className='flex justify-center '>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Create Team
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Createteammodal;
