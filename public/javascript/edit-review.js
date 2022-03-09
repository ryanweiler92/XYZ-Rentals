async function newFormHandler(event){
    event.preventDefault();

    let dents = document.querySelector('input[name="dents"]:checked') !==null;
    let scratches = document.querySelector('input[name="scratches"]:checked') !==null;
    let odor = document.querySelector('input[name="odor"]:checked') !==null;
    let stains = document.querySelector('input[name="stains"]:checked') !==null;
    const overall_rating = document.querySelector('input[name=overall]').value
    const review = document.querySelector('textarea[name=review').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      let attributesArray = [dents, scratches, odor, stains]

      for (let i = 0; i < attributesArray.length; i++){
          if (attributesArray[i] === true){
              attributesArray[i] = "checked"
          } else {
              attributesArray[i] = null
          }
      }

      dents = attributesArray[0];
      scratches = attributesArray[1]
      odor = attributesArray[2]
      stains = attributesArray[3]

    console.log(dents, scratches, odor, stains, overall_rating, review)

    const response = await fetch (`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            dents,
            scratches,
            odor,
            stains,
            overall_rating,
            review
                }),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then(document.location.replace('/dashboard'))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
}

document.querySelector('#submit-review-btn').addEventListener('click', newFormHandler);