interface Inputprops {
  placeholder: string;
  reference?: any
}

export function Input (props: Inputprops){
    return <div>
        <input ref={props.reference} placeholder={props.placeholder} type ={"text"} className=" px-4 py-2 border rounded m-2 focus:outline-none focus:ring-2 focus:ring-blue-400" ></input>
    </div>
}