document.getElementById("add-field").addEventListener("click", function () {
  const fieldType = document.getElementById("field-type").value;
  addField(fieldType);
});

document.getElementById("export-form").addEventListener("click", exportForm);

document.getElementById("import-form").addEventListener("change", importForm);

function createDeleteButton(parentElement) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    parentElement.remove();
  };
  return deleteButton;
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function addField(fieldType) {
  const formWorkArea = document.getElementById("form-work-area");
  const newField = document.createElement("div");
  newField.classList.add("field-container");

  const label = document.createElement("label");
  const uniqueId = `${fieldType}-${Date.now()}`;
  label.setAttribute("for", uniqueId);
  label.textContent = `${capitalize(fieldType)} Field: `;

  let input;
  switch (fieldType) {
    case "text":
    case "email":
    case "password":
      input = document.createElement("input");
      input.type = fieldType;
      input.id = uniqueId;
      input.name = uniqueId;
      newField.appendChild(label);
      newField.appendChild(input);
      break;
    case "dropdown":
      addDropdown(newField, uniqueId, ["Option 1", "Option 2"]);
      break;
    case "checkbox":
    case "radio":
      addCheckboxOrRadioOptions(newField, fieldType, uniqueId, [
        "Option 1",
        "Option 2",
      ]);
      break;
  }

  const deleteButton = createDeleteButton(newField);
  newField.appendChild(deleteButton);
  formWorkArea.appendChild(newField);
}

function addDropdown(container, name, options) {
  const select = document.createElement("select");
  select.id = name;
  select.name = name;
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });
  container.appendChild(select);
}

function addCheckboxOrRadioOptions(container, type, name, options) {
  options.forEach((option, index) => {
    const input = document.createElement("input");
    const optionId = `${name}-${index}`;
    input.type = type;
    input.id = optionId;
    input.name = name;
    input.value = option;

    const label = document.createElement("label");
    label.setAttribute("for", optionId);
    label.textContent = option;

    container.appendChild(input);
    container.appendChild(label);
  });
}

function exportForm() {
  const formFields = document.querySelectorAll(
    "#form-work-area .field-container"
  );
  const formConfig = Array.from(formFields).map((field) => {
    const fieldType =
      field.querySelector("input, select").type ||
      field.querySelector("input, select").tagName.toLowerCase();
    const fieldConfig = {
      type: fieldType,
      id: field.querySelector("input, select").id,
      name: field.querySelector("input, select").name,
      options: [],
      value: "",
    };

    if (fieldType === "checkbox" || fieldType === "radio") {
      const inputs = field.querySelectorAll("input");
      fieldConfig.checkedOptions = [];
      inputs.forEach((input) => {
        if (input.checked) {
          fieldConfig.checkedOptions.push(input.value);
        }
      });
    } else if (fieldType === "select-one") {
      fieldConfig.value = field.querySelector("select").value;
    } else {
      fieldConfig.value = field.querySelector("input").value;
    }

    return fieldConfig;
  });

  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(formConfig));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "form_config.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function importForm(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const config = JSON.parse(e.target.result);
    const formWorkArea = document.getElementById("form-work-area");
    formWorkArea.textContent = "";
    config.forEach((field) => {
      addField(field.type);
    });
  };
  fileReader.readAsText(event.target.files[0]);
}
