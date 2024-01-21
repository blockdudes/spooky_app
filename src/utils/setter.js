const API_URL = process.env.REACT_APP_API_URL;

export async function setTX(
    signer,
    type,
    from,
    to,
    amount
) {
    console.log("Ttttttttttt")
    console.log( API_URL)
    fetch(`${API_URL}/api/txHistory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            signer,
            type,
            from,
            to,
            amount
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}



export async function setBorrowList(
    onBehalfOf,
    lender,
    amount
) {
    fetch(`${API_URL}/api/borrowList`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            onBehalfOf,
            lender,
            amount,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


