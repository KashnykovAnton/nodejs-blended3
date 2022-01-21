const { Router } = require("express");
const {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  removeBook,
} = require("../controllers");

// const router = express.Router()
const router = Router();

router.route("/").get(getAllBooks);
router.route("/:id").get(getBook);
router.route("/").post(addBook);
router.route("/:id").put(updateBook);
router.route("/:id").delete(removeBook);

// router.get("/", getAllBooks);
// router.get("/:id", getBook);
// router.post("/", addBook);
// router.put("/:id", updateBook);
// router.delete("/:id", removeBook);

// router.get("/", () => {
//   console.log("get all books");
// });
// router.get("/:id", () => {
//   console.log("get book");
// });
// router.post("/", () => {
//   console.log("add book");
// });
// router.put("/:id", () => {
//   console.log("update book");
// });
// router.delete("/:id", () => {
//   console.log("delete book");
// });

module.exports = router;
