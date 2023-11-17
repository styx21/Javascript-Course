function toggleButton(selector) {
  const elementButton = document.querySelector(selector);
  if (!elementButton.classList.contains('is-toggled')) {
      elementButton.classList.add('is-toggled');
    } else {
      elementButton.classList.remove('is-toggled')
    }

    

}