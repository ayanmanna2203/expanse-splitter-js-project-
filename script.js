const BADGE_COLORS = ['#2F6B4F', '#3D5A80', '#8C5E58', '#6A7B76'];

const addMemberForm = document.querySelector("#add-member-form")
const MEMBERS_LOCALSTORAGE_KEY = "members"
let p = getElementById("member-error-msg")

let allMembers = getItems(MEMBERS_LOCALSTORAGE_KEY)

function getElementById(id) {
    return document.getElementById(id);
}

function getRandomBadgeColor() {
    let randomIndex = Math.floor(Math.random() * BADGE_COLORS.length)
    // console.log(randomIndex);
}
// getRandomBadgeColor()
function getItems(key) {
    return JSON.parse(localStorage.getItem(key)) || []
}

function setItems(key, item) {
    localStorage.setItem(key, JSON.stringify(item))
}

addMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("Hii");


    let value = getElementById("member-name-input").value.trim()
    if (!value) {



        p.textContent = `Please enter a name`
        p.classList.remove("hidden")
        return
    }



    const isMemAlreadyExist = allMembers.some(({ name }) => (name.toLowerCase() === value.toLowerCase()))
    if (isMemAlreadyExist) {
        p.textContent = `the member already exsist`
        p.classList.remove("hidden")
        return
    }

    p.classList.add("hidden")
    allMembers = [...allMembers, { name: value, id: `mem_${Date.now()}` }]


    setItems(MEMBERS_LOCALSTORAGE_KEY, allMembers)

    value = getElementById("member-name-input").value = "";
    renderAll()
})

function renderMembers() {
    const membersList = getElementById("members-list");


    membersList.innerHTML = ""

    getElementById("members-count").textContent = `${allMembers.length} members`
    allMembers.forEach(({ id, name }) => {
        let li = document.createElement('li')

        if (!allMembers.length) {
            getElementById("members-empty").classList.remove("hidden")
            membersList.classList.add("hidden")
            return;
        }
        getElementById("members-empty").classList.add("hidden")
        membersList.classList.remove("hidden")



        li.classList = "flex items-center justify-between py-2.5 px-1 hover:bg-slate-100/50 transition-colors gap-2"
        li.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium text-white shrink-0 select-none" style="background-color: #2F6B4F;">
                    ${name[0].toUpperCase()}
                  </span>
                  <span class="font-sans text-sm font-medium text-ledger-ink truncate break-words">${name}</span>
                </div>
                <button type="button" class="remove-member-btn text-ledger-muted hover:text-ledger-rust p-2 rounded-sm transition-colors cursor-pointer shrink-0 ml-2 min-w-[36px] min-h-[36px] flex items-center justify-center" data-id="${id}" title="Remove ram" aria-label="Remove ram">
                  <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>`


        membersList.append(li);
    })


    membersList.addEventListener("click", (e) => {

        e.stopPropagation();
        const remMenBtn = e.target.closest(".remove-member-btn")
        if (remMenBtn) {
            const id = remMenBtn.dataset.id;
            console.log(id);
            allMembers = allMembers.filter(({ id: memId }) => memId !== id);
            setItems(MEMBERS_LOCALSTORAGE_KEY, allMembers)
            renderAll()

        }

        // console.log(e.target.closest(".remove-member-btn").dataset.id);
    })
}





const expenseMembersWarning = getElementById("expense-members-warning")
const addExpenseForm = getElementById("add-expense-form")




function removeMember(id) {


}

function renderAddExpanse() {
    if (allMembers.length < 2) {
        expenseMembersWarning.classList.remove("hidden")
        addExpenseForm.classList.add("hidden")
    }
    else {

        expenseMembersWarning.classList.add("hidden")
        addExpenseForm.classList.remove("hidden")
    }
    // console.log(getElementById("expense-payer-select").value);
    let expansePayeSelect = getElementById("expense-payer-select")
    let splitMembersContainer = getElementById("split-members-container")
    expansePayeSelect.innerHTML = ""
    splitMembersContainer.innerHTML = ""

    allMembers.forEach(({ id, name }) => {
        let option = document.createElement("option")
        option.value = id;
        option.textContent = name;
        let label = document.createElement("label")
        label.className = "flex items-center gap-2.5 text-xs font-sans text-ledger-ink cursor-pointer hover:bg-slate-100/60 px-2 py-2 rounded-sm select-none border border-transparent hover:border-ledger-border transition-colors min-h-[36px]"
        label.innerHTML = `
         <input type="checkbox" value=${name} class="split-member-checkbox rounded-sm text-ledger-forest accent-[#2F6B4F] cursor-pointer w-4 h-4 shrink-0" checked>
                  <span class="truncate break-all min-w-0">${name}</span>`
        expansePayeSelect.append(option)
        splitMembersContainer.append(label)
    })
}

function renderAll() {

    renderMembers()

    renderAddExpanse()


}
renderAll()


