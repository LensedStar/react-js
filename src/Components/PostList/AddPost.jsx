import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux'
import { putPosts } from "../../Store/Slices/postListSlice"

export default function AddPost({onClose}){
    const dispatch = useDispatch()
    const {register, formState:
        {
            errors,
        }, 
        handleSubmit} = useForm({
            mode:"onBlur"
        })

    const onSubmit = (data,event) => {
        event.preventDefault()
        dispatch(putPosts(data))
        onClose() 
    }

    return(
        <form className="add-form" onSubmit={ handleSubmit(onSubmit) } >
            <div className="form-inputs">
                <label>Header:</label>
                <input name="header" className="form-title" type="text" { ...register( "title",
                { required:"Field is required", minLength:{value:5,message:'Min character length is 10 symbols!'} , maxLength: {value:30,message:'Max character length is 50 symbols!'} } ) } />
                <div className="error-block">                   
                     { errors?.title && 
                    <p className="error"> {errors.title?.message } </p> }
                </div>
                <label>Text:</label>
                <textarea name="text"  type="textarea" className="form-text" { ...register( "body",
                {  minLength:{value:40,message:'Min character length is 40 symbols'}, maxLength:{value:1000,message:'Max character length is 1000 symbols'}, required:"Field is required" } ) } />
                <div className="error-block">
                    {errors?.body && 
                    <p className="error"> {errors.body.message } </p> }
                </div>
            </div>
            <div className="form-footer">
                <button className="close-btn" onClick={()=>onClose()} > Close </button>
                <button className="add-btn" type="submit">Add Post</button>
            </div>
        </form>
    )
}