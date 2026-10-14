export default function Productcard(props){
    console.log(props.name)

    return(
        <div className="bg-red-500 text-white">
            <h1>{props.name}</h1>
            <img src={props.image} alt="Dog-image" />
            <p>LKR {props.price}</p>
            <button>Buy now</button>
        </div>
    )




}// if we create some new tags in React first letter should be Capital