const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();

  // These are your product fields
  form.append("name", name);
  form.append("price", price);
  form.append("description", description);
  form.append("category", category);

  // ADD IMAGES CORRECTLY
  for (let i = 0; i < files.length; i++) {
    form.append("images", files[i]); // <-- IMPORTANT
  }

  const res = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  console.log("Upload success:", data);
};
