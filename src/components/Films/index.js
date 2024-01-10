

const Films = ({films}) => {
    return (
        <ul className="list-group list-group-flush">
            {
                films.map(item => {
                    return (
                        <li className="list-group-item" key={item.episode_id}>
                            <span className="fw-bold">Episode: </span>
                            <span>{item.episode_id}</span>
                            <span className="fw-bold ps-5">Director: </span>
                            <span>{item.director}</span>
                            <span className="fw-bold ps-5">Title: </span>
                            <span>{item.title}</span>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Films