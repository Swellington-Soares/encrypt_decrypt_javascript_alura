const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const ViewModel = {
  inputTextArea: document.getElementById("inputTextArea"),
  btnEncode: document.getElementById("btnEncode"),
  btnDecode: document.getElementById("btnDecode"),
  containerResult: document.getElementById("containerResult"),
  btnCopy: document.getElementById("btnCopy"),
  resultTextArea: document.getElementById("resultTextArea"),
  noCopyContainer: document.getElementById("noCopyContainer"),
  errorMessage: document.getElementById("errorMessage"),

  encryptedText: "",
};

function codificar(text) {
  return Array.from(text.toLocaleLowerCase())
    .map((x) => keys[x] ?? x)
    .join("");
}

function decodificar(text) {
  const reverseKey = Object.fromEntries(
    Object.entries(keys).map(([k, v]) => [v, k])
  );
  Object.keys(reverseKey).forEach((k) => {
    text = text.split(k).join(reverseKey[k]);
  });
  return text;
}

function IsInputTextValid() {
  return ViewModel.encryptedText.match(/^[a-z\s]+$/i);
}

function ShowError() {
  ViewModel.errorMessage.style.color = "red";
  setTimeout(() => {
    ViewModel.errorMessage.style.color = "#343a40";
  }, 500);
}

function ShowEmptyTextContainer(){
    ViewModel.containerResult.style.display = 'none';
    ViewModel.noCopyContainer.style.display = 'flex';
}

function ShowResultContainer(text){
    ViewModel.resultTextArea.value = text
    ViewModel.noCopyContainer.style.display = 'none';
    ViewModel.containerResult.style.display = 'flex';
}

ViewModel.btnCopy.onclick = () => {
    navigator.clipboard.writeText( ViewModel.encryptedText ).then(() => {
        alert('Texto copiado para a área de transferência.')
    });

}

ViewModel.btnEncode.onclick = () => {
  ViewModel.encryptedText = ViewModel.inputTextArea.value;
  if (!IsInputTextValid()) {
    ShowEmptyTextContainer()
    return ShowError();
  }
  ViewModel.encryptedText = codificar(ViewModel.encryptedText);
  ViewModel.inputTextArea.value = ""
  ShowResultContainer(ViewModel.encryptedText)
};

ViewModel.btnDecode.onclick = () => {
  ViewModel.encryptedText = ViewModel.inputTextArea.value;

  console.log(ViewModel.encryptedText)

  if (!IsInputTextValid()) {
    ShowEmptyTextContainer()
    return ShowError();
  }
  ViewModel.encryptedText = decodificar(ViewModel.encryptedText);
  ViewModel.inputTextArea.value = ""
  ShowResultContainer(ViewModel.encryptedText)
};
