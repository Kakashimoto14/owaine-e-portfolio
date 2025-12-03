  function validateForm() {
    let valid = true;

    // Get all inputs and selects
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const studentID = document.getElementById("studentID");
    const section = document.getElementById("section");
    const gender = document.getElementById("gender");
    const email = document.getElementById("email");
    const age = document.getElementById("age");
    const course = document.getElementById("course");

    // Reset borders
    [firstName, lastName, studentID, section, gender, email, age, course].forEach(input => {
      input.style.border = "";
    });

    // Check if empty
    if (firstName.value.trim() === "") {
      firstName.style.border = "2px solid red";
      valid = false;
    }

    if (lastName.value.trim() === "") {
      lastName.style.border = "2px solid red";
      valid = false;
    }

    if (studentID.value.trim() === "") {
      studentID.style.border = "2px solid red";
      valid = false;
    }

    if (section.value.trim() === "") {
      section.style.border = "2px solid red";
      valid = false;
    }

    if (gender.value === "") {
      gender.style.border = "2px solid red";
      valid = false;
    }

    if (email.value.trim() === "") {
      email.style.border = "2px solid red";
      valid = false;
    }

    if (age.value === "") {
      age.style.border = "2px solid red";
      valid = false;
    }

    if (course.value === "") {
      course.style.border = "2px solid red";
      valid = false;
    }

    return valid;
  }
