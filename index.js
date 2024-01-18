let currentPage = 1;

function PostPage() {
    const current = document.querySelector('.page' + currentPage);
    current.classList.remove('active');

    currentPage = currentPage === 1 ? 2 : 1;

    const next = document.querySelector('.page' + currentPage);
    next.classList.add('active');
}

function PutPage() {
    const current = document.querySelector('.page' + currentPage);
    current.classList.remove('active');

    currentPage = currentPage === 1 ? 3 : 1;

    const next = document.querySelector('.page' + currentPage);
    next.classList.add('active');
}

function DeletePage() {
    const current = document.querySelector('.page' + currentPage);
    current.classList.remove('active');

    currentPage = currentPage === 1 ? 4 : 1;

    const next = document.querySelector('.page' + currentPage);
    next.classList.add('active');
}

function resetPage(pageNumber) {
    const current = document.querySelector('.page' + currentPage);
    current.classList.remove('active');

    currentPage = pageNumber;

    const next = document.querySelector('.page' + currentPage);
    next.classList.add('active');
}

var container = document.querySelector("#data");

$(document).ready(function () {
    $("#getDataBtn").click(function () {
        $.ajax({
            url: "https://localhost:7283/api/Student",
            type: "GET",
            success: function (data) {
                container.innerHTML = data;
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const apiUrl = 'https://localhost:7283/api/Student';

    const requestData = {
        fullname: document.getElementById('fullname').value,
        seriaNo: document.getElementById('seriaNo').value,
        age: document.getElementById('age').value,
        score: document.getElementById('score').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data saved:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dataId = document.getElementById('dataId').value;
    const apiUrl = `https://localhost:7283/api/Student/${dataId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data retrieved:', data);
            // Handle the retrieved data as needed (e.g., display it in the UI)
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});



// document.getElementById('deleteForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     const dataIdToDelete = document.getElementById('dataIdToDelete').value;
//     const apiUrl = `https://localhost:7283/api/Student/${dataIdToDelete}`; // Replace with your API endpoint

//     fetch(apiUrl, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(() => {
//         console.log('Data deleted successfully');
//         // Handle the deletion result as needed (e.g., display a success message)
//         document.getElementById('deleteResult').innerText = 'Data deleted successfully';
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//         // Handle the error result as needed (e.g., display an error message)
//         document.getElementById('deleteResult').innerText = 'Error deleting data';
//     });
// });

document.getElementById('deleteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dataIdToDelete = document.getElementById('dataIdToDelete').value;
    const apiUrl = `https://localhost:7283/api/Student/${dataIdToDelete}`; // Replace with your API endpoint

    fetch(apiUrl, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Check if the response Content-Type is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            // If the response is JSON, parse it
            return response.json();
        } else {
            // If not JSON, return an empty object
            return {};
        }
    })
    .then(() => {
        console.log('Data deleted successfully');
        // Handle the deletion result as needed (e.g., display a success message)
        document.getElementById('deleteResult').innerText = 'Data deleted successfully';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error result as needed (e.g., display an error message)
        document.getElementById('deleteResult').innerText = 'Error deleting data';
    });
});


