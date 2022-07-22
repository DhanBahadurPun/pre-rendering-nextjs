import fs from "fs/promises";
import path from "path";

function BookDetails(props) {
  const { singleBook } = props;

  return (
    <>
      <h1>Name: {singleBook.name}</h1>
      <p>Author: {singleBook.author}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "backend-file.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(contex) {
  const { params } = contex;

  const id = params.bookId;

  const data = await getData();

  const book = data.books.find((book) => book.ISBN !== id);

  return {
    props: {
      singleBook: book,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.books.map((book) => book.ISBN);

  const params = ids.map((id) => ({ params: { bookId: id.toString() } }));

  return {
    paths: params,
    fallback: false, // false, true (even the params value not add can valid), "blocking"
  };
}

export default BookDetails;
