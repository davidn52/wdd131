document.addEventListener('DOMContentLoaded', function () {
  const showBtn = document.getElementById('showLocation');
  const info = document.getElementById('info');

  if (showBtn && info) {
    showBtn.addEventListener('click', function () {
      info.textContent = 'Current URL: ' + location.href;
      console.log('Location object:', location);
      alert('Current URL: ' + location.href);
    });
  }

  const input = document.querySelector('#favchap');
  const button = document.querySelector('#addChapter');
  const list = document.querySelector('#favList');

  if (input && button && list) {
    button.addEventListener('click', function () {
      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }

      const li = document.createElement('li');
      li.textContent = value;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '❌';
      deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        input.focus();
      });

      li.append(deleteButton);
      list.append(li);

      input.value = '';
      input.focus();
    });
  }

  console.log('bom.js loaded');
});
