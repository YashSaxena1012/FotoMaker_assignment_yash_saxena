//import statements
import React, { useEffect, useState } from 'react'
import View from './View';

//to get data from the localstorage
const getDatafromLs = () => {
    const data = localStorage.getItem('myslots');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}


const Form = () => {

    //states and constants used in the program
    const [Name, setName] = useState('')
    const [valid, setValid] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState('')
    const [slots, setSlots] = useState(getDatafromLs)
    const persons = [{
        id: 1,
        name: "Ish",
        slot: [
            "08:00 am to 09:00 am",
            "01:00 pm to 02:00 pm",
            "07:00 pm to 08:00 pm",
            "10:00 pm to 11:00 pm"
        ]
    },
    {
        id: 2,
        name: "Shiv",
        slot: [
            "09:00 am to 10:00 am",
            "02:00 pm to 03:00 pm",
            "08:00 pm to 09:00 pm"
        ]
    },
    {
        id: 3,
        name: "Shrav",
        slot: [
            "10:00 am to 11:00 am",
            "04:00 pm to 05:00 pm"
        ]
    },
    {
        id: 4,
        name: "Shanti",
        slot: [
            "11:00 am to 12:00 pm",
            "05:00 pm to 06:00 pm",
            "11:00 pm to 12:00 am"
        ]
    },
    {
        id: 5,
        name: "Poo",
        slot: [
            "12:00 pm to 01:00 pm",
            "06:00 pm to 07:00 pm",
            "09:00 pm to 10:00 pm"
        ]
    }
    ]
    const [personData, setPersondata] = useState(persons)

    //to handle change of names
    const handleChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);

        if (inputValue === '') {
            setValid(null);
        }
    }

    //to handle the  click and search for valid names
    const handleClick = () => {
        const personNames = persons.map((person) => {
            return person.name
        })
        if (personNames.includes(Name)) {
            setValid(true);
        }
        else {
            setName('')
            alert("ENTER VALID NAME")
            setValid(false);
        }
    }

    //to delete the slots selected
    const deleteSlot = (name, slotToDelete) => {
        setPersondata(prevState => {
            const updatedPersons = prevState.map(person => {
                if (person.name === name) {
                    const updatedSlots = person.slot.filter(slot => slot !== slotToDelete);
                    return {
                        ...person,
                        slot: updatedSlots
                    };
                }
                return person;
            });
            return updatedPersons;
        });
    }

    //to handle submit request
    const handleSubmit = (e) => {
        e.preventDefault();
        if (valid) {
            deleteSlot(Name, selectedSlot)
            setSlots([...slots, { name: Name, slot: selectedSlot }]);
            setName("");
            setSelectedSlot("");
            setValid(null);
        }
    };

    //to store the data on localStorage
    useEffect(() => {
        if (slots !== null)
            localStorage.setItem('myslots', JSON.stringify(slots));
    }, [slots]
    );

    return (
        <>
            <h2 className='text-3xl font-bold text-gray-600 text-center'>BOOK SLOTS</h2>
            <div className='w-1/2 mx-auto my-2  border-blue-800 border-2 shadow-2xl rounded-lg p-4  translate-y-1/5'>
                <form target='_parent' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-8 justify-center align-middle m-auto w-9/12'>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={Name}
                            onChange={(e) => { handleChange(e) }}
                            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder="Enter Name" required
                        />
                        {valid ? (<>
                            <label
                                htmlFor="slots"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Book A Slot
                            </label>
                            <select
                                id="slots"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedSlot}
                                onChange={(e) => setSelectedSlot(e.target.value)}
                                required
                            >
                                <option value="">Choose a Slot</option>
                                {personData.map(person => (
                                    person.slot.map(slot => (
                                        person.name == Name ?
                                            <option key={slot} value={slot}>{slot} - {person.name}</option>
                                            : ""
                                    ))
                                ))}
                            </select>
                            <p className="mt-2 text-gray-900 dark:text-white">
                                Selected slot: {selectedSlot !== null ? selectedSlot : "NONE"}
                            </p>
                            <button
                                type="submit"
                                className="text-gray-900 hover:text-white mb-8 border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Submit</button>
                        </>
                        ) : (<button type="button" onClick={() => handleClick()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Search</button>
                        )}
                    </div>
                </form>
            </div>
            <div>
                <View slots={slots} />
            </div>
        </>
    )
}

export default Form
