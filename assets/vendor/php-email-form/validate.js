document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio real do formulário

    var formData = new FormData(form);
    var loadingElement = document.querySelector('.loading');
    var sentMessageElement = document.querySelector('.sent-message');
    var errorMessageElement = document.querySelector('.error-message');

    loadingElement.style.display = 'block';
    sentMessageElement.style.display = 'none';
    errorMessageElement.style.display = 'none';

    fetch('sendEmail.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(responseText => {
      loadingElement.style.display = 'none';

      if (responseText === 'success') {
        sentMessageElement.style.display = 'block';
      } else {
        errorMessageElement.style.display = 'block';
        errorMessageElement.textContent = 'An error occurred while sending the message. Please try again.';
      }
    })
    .catch(error => {
      loadingElement.style.display = 'none';
      errorMessageElement.style.display = 'block';
      errorMessageElement.textContent = 'An error occurred while sending the message. Please try again.';
    });
  });
});