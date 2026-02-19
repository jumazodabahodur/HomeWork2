const box = document.querySelector(".box")
const api = "https://6966216af6de16bde44c5161.mockapi.io/students"
const Form = document.querySelector(".AddForm")
const AddModal = document.querySelector(".AddModal")
const Add = document.querySelector(".Add")
let idx =null

const InfoModal = document.querySelector(".Infomodal")
const Name = document.querySelector(".Name")
const avatar = document.querySelector(".avatar")
const Age = document.querySelector(".Age")
const Salary = document.querySelector(".Salary")

const EditModal = document.querySelector(".EditModal")
const EditForm = document.querySelector(".EditForm")

const Close = document.querySelector(".close")
const CloseInfo = document.querySelector(".closeInfo")

async function GetUser() {
    try {
        const response = await fetch (api)
        const data = await response.json()
        ShowUser(data)
    } catch (error) {
        console.log(error);
        
    }
}

function ShowUser (user){
box.innerHTML = ""

user.forEach((e)=>{
    const tr = document.createElement("tr")
    const name = document.createElement("td")
    const salary = document.createElement("td")
    const age = document.createElement("td")
    const action = document.createElement("td")
    const email = document.createElement("td")


    const btnDel = document.createElement("button")
    const btnEdit = document.createElement("button")
    const btnInfo = document.createElement("button")

    btnDel.classList.add("Del")
    btnEdit.classList.add("Edit")
    btnInfo.classList.add("Info")

email.innerHTML = e.emaile
    name.innerHTML = e.name
    age.innerHTML = e.age
    salary.innerHTML = e.salary

    btnDel.innerHTML = "🗑️"
    btnEdit.innerHTML = "✏️"
    btnInfo.innerHTML = "👁️"

    btnDel.onclick = ()=>{
        DeleteUser(e.id)
    }

    btnEdit.onclick = ()=>{
        EditUser(e)
    }
    btnInfo.onclick = () =>{
    InfoModal.show()
   InfoUser(e)
}

    tr.append(name,email,salary,age,action)
    action.append(btnDel,btnEdit,btnInfo)
    box.append(tr)
})
}

GetUser()


async function DeleteUser(id){
    try {
        await fetch(`${api}/${id}`,{method:"DELETE"})
    } catch (error) {
        console.log(error);

    }
    GetUser()
}


Add.onclick = ()=>{
    AddModal.show()
}


Form.onsubmit = (event) =>{
    event.preventDefault()
     const obj = {
        name :Form["avatar"].value,
         name:Form["name"].value,
        salary :Form["salary"].value,
        age :Form["age"].value,
     }
PostUser(obj)
   AddModal.close() 
   Form.reset()
}


Close.onclick = ()=>{
    AddModal.close()
}

async function PostUser(obj) {
    try {
        await fetch(api,{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(obj)

        })
        GetUser()
    } catch (error) {
        console.log(error);
        
    }
  
}

function EditUser(e){
    EditModal.showModal()
EditForm["avatar"].value = e.avatar
EditForm["name"].value = e.name
EditForm["salary"].value = e.salary
EditForm["age"].value = e.age
idx = e.id
}


EditForm.onsubmit = async (event) =>{
    event.preventDefault()
console.log(idx);
EditModal.close()

    const obj = {
    
        name:EditForm["name"].value,
        salary:EditForm["salary"].value,
        age:EditForm["age"].value,
    }

try {
       await fetch(`${api}/${idx}`,{
        method:"PUT",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(obj)
    })
} catch (error) {
    console.log(error);
    
}
GetUser()
}



function InfoUser(e){
  
Name.innerHTML = e.name
Salary.innerHTML = e.salaray
Age.innerHTML = e.age
}

CloseInfo.onclick = () =>{
    InfoModal.close()
}

