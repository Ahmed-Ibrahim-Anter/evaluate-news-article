function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById('article-url').value;
  console.log('formText: ', formText);

  if (Client.validateUrl(formText)) {



    postData('http://localhost:8081/user', { url: formText }).then(function (res) {



      document.getElementById('text').innerHTML = `Text: ${res.sentence_list[0].text}`;
      document.getElementById('Polarity').innerHTML = `Sentiment Score:   ${res.score_tag}`;
      document.getElementById("agreement").innerHTML = `Agreement:   ${res.agreement}`;
      document.getElementById("subjectivity").innerHTML = `Subjectivity:  ${res.subjectivity}`;
      document.getElementById("confidence").innerHTML = `Confidence:  ${res.confidence}`;
      document.getElementById("irony").innerHTML = `Irony:   ${res.irony}`;
    })
  } else {
    alert('invalid URL');
  }
}

const postData = async (url = '', data = {}) => {
  console.log(data, 'postData');

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData, 'posted');
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}


export { handleSubmit }