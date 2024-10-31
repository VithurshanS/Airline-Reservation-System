import { useState } from 'react';
import './Userdetails.css';

const UserPage = () => {
    const [users] = useState([
        { user_id: 1, user_name: 'johndoe', first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', DOB: '1990-01-15', age: 34, gender: 'Male', user_category: 'Gold', booking_counts: 12 },
        { user_id: 2, user_name: 'janesmith', first_name: 'Jane', last_name: 'Smith', email: 'janesmith@example.com', DOB: '1985-05-20', age: 39, gender: 'Female', user_category: 'Frequent', booking_counts: 8 },
        { user_id: 3, user_name: 'mikejohnson', first_name: 'Mike', last_name: 'Johnson', email: 'mikejohnson@example.com', DOB: '1992-03-17', age: 32, gender: 'Male', user_category: 'Regular', booking_counts: 4 },
    ]);

    return (
        <div className="page-background">
            <div className="user-page-container">
                <h2>User Management</h2>
                
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Date of Birth</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Category</th>
                            <th>Booking Counts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.user_name}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>{user.DOB}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.user_category}</td>
                                <td>{user.booking_counts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserPage;