async function newFormHandler(event){
    event.preventDefault();

    const dents = document.querySelector('input[name=dents]').value
    const scratches = document.querySelector('input[name=scratches]').value;
    const odor = document.querySelector('[name=odor]').value;
    const stains = document.querySelector('[name=stains]').value;
    const overall_rating = document.querySelector('input[name=overall]').value
    const review = document.querySelector('textarea[name=review').value.trim();
    const car_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    console.log(dents, scratches, odor, stains, overall_rating, review, car_id)

    const response = await fetch (`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            dents,
            scratches,
            odor,
            stains,
            overall_rating,
            review,
            car_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
};

document.querySelector('#submit-review-btn').addEventListener('click', newFormHandler);