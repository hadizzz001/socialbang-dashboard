"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation' 
import Dropzone from './Dropzone'



const AddPost = () => {

  const router = useRouter();
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false); 
  const [inputs, setInputs] = useState({}); 
  const [active, setActive] = useState(false)
  const [firstSelectValue, setFirstSelectValue] = useState('');
  const [secondSelectValue, setSecondSelectValue] = useState('0');
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [value1, setValue1] = useState('');  
  const [imgs, setImgs] = useState([''])
 


 

 
 


 


  useEffect(() => {
    setInputs((prevState) => ({ ...prevState, category: "" + firstSelectValue, type: "" + secondSelectValue , img: imgs }));
  }, [firstSelectValue, secondSelectValue, imgs ])


   
 

 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (e.target.category.value == "0") {
      alert("Please select a category");
    }
    else if (secondSelectValue == "0") {
      alert("Please select a type");
    }
    else if (imgs.includes("")) {
      alert("Please select item image");
    }
    else {
      setActive(true)
      axios
        .post("/api/posts", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false); 
          setActive(false)
          window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "price") { 
      // Allow digits and one dot
      const numericValue = e.target.value.replace(/[^0-9.]/g, '');
      // Ensure only one dot is allowed
      const validNumericValue = numericValue.includes('.')
        ? numericValue.split('.').slice(0, 2).join('.')
        : numericValue;
      setValue1(validNumericValue);
    }

    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value, img: localStorage.getItem("sharedValue") }));
  };






  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    const optionsForSecondSelect = getOptionsForSecondSelect(selectedValue);
    setSecondSelectOptions(optionsForSecondSelect);
  };

  const getOptionsForSecondSelect = (firstSelectValue) => {
    switch (firstSelectValue) {
      case 'Cards':
        // return ['--Choose Type--', 'Business Cards', 'Reviews Cards', 'Social Media Cards', 'Medical ID Cards'];
        return ['--Choose Type--', 'Reviews Cards', 'Social Media Cards', 'Medical ID Cards'];
      case 'Tags':
        return ['--Choose Type--', 'Pets Tags', 'Reviews Tags', 'Social Media Tags', 'Medical ID Tags'];
      case 'Stands':
        return ['--Choose Type--', 'Review Stands', 'Menu Stands'];
      case 'Stickers':
        return ['--Choose Type--', 'Business Cards Stickers', 'Reviews Stickers', 'Social Media Stickers', 'Medical ID Stickers'];
      default:
        return [];
    }
  };



  const handleImgChange = (url) => {
    if (url) { 
      setImgs(url); 
    }
  }



 





  return (
    <div>
     
      {/* <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#ea6a2b" }}
      >
        Add New Item
      </button> */}

      <button
        onClick={() => push("/reservation")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em", background: "#ea6a2b" }}
      >
        View Orders
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
 
          <form className="w-full mt-3" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-3"
              value={inputs.description || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Price"
              name="price"
              className="w-full p-2 my-3"
              value={value1}
              onChange={handleChange}
              required
            />



            <select name="category" value={firstSelectValue} onChange={handleFirstSelectChange} style={{ width: "100%", height: "40px" }}  >
              <option value="0" selected>--Choose Category--</option>
              <option value="Cards">Cards</option>
              <option value="Tags">Tags</option>
              <option value="Stands">Stands</option>
              <option value="Stickers">Stickers</option>
            </select>

            <br />


            <select value={secondSelectValue} onChange={(event) => setSecondSelectValue(event.target.value)} style={{ width: "100%", height: "40px" }} className="mt-3">

              {secondSelectOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>


            <Dropzone HandleImagesChange={handleImgChange} className='mt-10 border border-neutral-200 p-16' />


            <button type="submit" className="px-5 py-2 mt-3" style={{ background: "#ea6a2b" }} disabled={active}>
              Submit
            </button>
          </form> 
      </Modal>
    </div>
  );
};

export default AddPost;
