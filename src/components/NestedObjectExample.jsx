import { useState } from "react";

export function NestedObjectExample() {
  const [person, setPerson] = useState({
    name: "John",
    age: 25,
    address: {
      street: "123 Main Street",
      city: "Delhi",
    },
  });

  // updating nested objects
  function updateAddress() {
    setPerson((prevPerson) => ({
      ...prevPerson,
      address: {
        ...prevPerson.address,
        city: "Mumbai",
      },
    }));
  }

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>
        Address: {person.address.street}, {person.address.city}
      </p>
      <button onClick={updateAddress}>Update Address</button>
    </div>
  );
}

export default NestedObjectExample;
