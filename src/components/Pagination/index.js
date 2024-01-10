import "./style.css"

const Pagination = ({ pageNumber, updatePageNumber }) => {

    const changePage = (type, number) => {
        switch (type) {
            case "next":
                if (pageNumber < 9) updatePageNumber(prevPageNumber => prevPageNumber + 1);
                break;
            case "previous":
                if (pageNumber > 1) updatePageNumber(prevPageNumber => prevPageNumber - 1);
                break;
            default:
                updatePageNumber(number);
                break;
        }
    }

    const pages = 9;
    const counted = [];
    for (let i = 1; i <= pages; i++) {
        counted.push(
            <button
                onClick={() => changePage("number", i)}
                className="paginate-btn btn btn-warning ms-1"
                key={i}
            >
                {i}
            </button>
        );
    }


    return (
        <nav aria-label="..." className="d-flex flex-column align-items-center justify-content-center m-2">
            <ul className="pagination">
                <li className="page-items">
                    <button
                        onClick={() => changePage("previous")}
                        className="btn btn-danger"
                        disabled={pageNumber === 1}
                    >
                        Previous
                    </button>
                </li>
                <li className="page-item">{counted}</li>
                <li className="page-item">
                    <button
                        onClick={() => changePage("next")}
                        className="btn btn-danger ms-1"
                        disabled={pageNumber === 9}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination