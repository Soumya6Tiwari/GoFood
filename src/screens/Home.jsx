import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'



export default function Home() {
  
  //create a state for performing search functionality jiski initial value ek empty string rahegi rather than a object
  const[search,setSearch]=useState('');


  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);


  const loadData=async ()=>{
     let response =await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
           'Content-Type':'application/json'
      }
     });
     //converting response into json
     response= await  response.json();

    //  console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(()=>{
    loadData()
  },[])



  return (
    <div>
      <div><Navbar /></div>
      <div>    <div>
    
    <div id="carouselExampleFade" className="carousel slide carousel-fade carousel-fit" data-bs-ride="carousel" >
      <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption" style={{zIndex:"9"}}>
        <div className="d-flex justify-content-center">
          <input className="form-control me-2 w-75 bg-white text-dark" type="Type in...." placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
          
        </div>
        </div>
        <div className="carousel-item active">
          <img src="https://source.unsplash.com/random/900x700/?burger"  className="d-block w-100" style={{filter:"brightness(30%)"}}/>
        </div>
        <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
        </div>
        <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?chowmein" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
        </div>
        <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?gulabjamun" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
        </div>
        <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x700/?tandoor" className="d-block w-100" style={{filter:"brightness(30%)"}}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
        </div></div>
      {/* container is mobile first approach */}
      <div className='container'>        
         {/* /* use of ternary operator */ }
        {
          foodCat!=[]
          ? foodCat.map((data)=>{
            return ( <div className='row mb-3'>
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>
                   <hr/>
                   {foodItem!=[]
                   ?
                   foodItem.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems =>{
                    
                   
                    return(
                      <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem={filterItems}
                        options={filterItems.options[0]}
                        >
                        </Card>
                        </div>

                    )
                    
                   }):<div>"No Such Data Found"</div>}
                  
                </div>
            )
          })
          : ""}
        
  
      </div>
      <div><Footer /></div>
    </div>
  )
}
