const express = require("express");
const author = require("../models/author");
const routes = express.Router();
//ALL Authors Route
routes.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOptions.name = RegExp(req.query.name, "i");
  }
  try {
    const Authors = await author.find({ searchOptions });
    res.render("authors/index", { authors: Authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

//New Author Route
routes.get("/new", (req, res) => {
  res.render("authors/new", { author: author() });
});

//Create Author Route
routes.post("/", async (req, res) => {
  const Author = author({
    name: req.body.name,
  });
  try {
    const newAuthor = await Author.save;
    res.redirect("authors");
    //res.redirect('authors/$(newAuthor.id)');
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error Creating Author",
    });
  }
});

module.exports = routes;
