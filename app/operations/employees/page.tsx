"use client"

import { useState, useEffect } from "react"
import { Search, Edit, Trash2, Plus, List, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import AddEmployeeModal from "./add-employee-modal"
import EditEmployeeModal from "./edit-employee-modal"
import DeleteEmployeeModal from "./delete-employee-modal"

export interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  position: string;
  permissions: string;
  status: string;
  email: string;
  username: string;
  password: string;
}

// API placeholder functions
async function fetchEmployees(): Promise<Employee[]> {
  // Simulate API call
  return [
    { id: 1, employeeId: "000001", firstName: "Juan", lastName: "Dela Cruz", position: "Cashier", permissions: "[Sales, Stocks, ...]", status: "Active", email: "juan@gmail.com", username: "juan213", password: "••• •••" },
    { id: 2, employeeId: "000002", firstName: "Melchora", lastName: "Aquino", position: "Checker", permissions: "[Sales-Orders,...]", status: "Active", email: "mel@gmail.com", username: "mel123", password: "••• •••" },
    { id: 3, employeeId: "000003", firstName: "Juancho", lastName: "Melchor", position: "BO Staff", permissions: "[Dashboard]", status: "Inactive", email: "cho@gmail.com", username: "cho321", password: "••• •••" },
  ]
}
async function addEmployee(employee: Employee) { return employee }
async function updateEmployee(employee: Employee) { return employee }
async function deleteEmployee(id: number) { return id }

export default function RegisteredEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  useEffect(() => {
    fetchEmployees().then(setEmployees)
  }, [])

  const handleNewEmployee = () => setShowAdd(true)
  const handleEdit = (employee: Employee) => { setSelectedEmployee(employee); setShowEdit(true) }
  const handleDelete = (employee: Employee) => { setSelectedEmployee(employee); setShowDelete(true) }

  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <List className="w-3 h-3" />
            List
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Registered Employees</h1>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-64 border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900 w-10">#</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Employee ID</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">First Name</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Last Name</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Position</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Permissions</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Status</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Email</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Username</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900">Password</TableHead>
              <TableHead className="px-4 py-4 text-left text-sm font-medium text-gray-900 w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.filter(e => e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || e.username.toLowerCase().includes(searchTerm.toLowerCase())).map((employee, idx) => (
              <TableRow key={employee.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-4 text-sm text-gray-900 font-bold">{idx + 1}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.employeeId}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.firstName}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.lastName}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.position}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.permissions}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.status}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900 underline cursor-pointer">{employee.email}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.username}</TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">{employee.password}</TableCell>
                <TableCell className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(employee)} className="text-gray-600 hover:text-gray-900 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(employee)} className="text-gray-600 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    <button className="text-gray-600 hover:text-gray-900 transition-colors" title="Reset Password"><RefreshCw className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <Button onClick={handleNewEmployee} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md flex items-center gap-2"><Plus className="w-4 h-4" />New Employee</Button>
        {/* Pagination (static for now) */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>Prev</button>
          {[1, 2, 3, 4].map((page) => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 text-sm rounded transition-colors ${currentPage === page ? "bg-gray-800 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>{page}</button>
          ))}
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}>Next</button>
        </div>
      </div>
      {/* Modals */}
      <AddEmployeeModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={async (emp: Employee) => { await addEmployee(emp); setShowAdd(false); fetchEmployees().then(setEmployees) }} />
      <EditEmployeeModal open={showEdit} employee={selectedEmployee} onClose={() => setShowEdit(false)} onEdit={async (emp: Employee) => { await updateEmployee(emp); setShowEdit(false); fetchEmployees().then(setEmployees) }} />
      <DeleteEmployeeModal open={showDelete} employee={selectedEmployee} onClose={() => setShowDelete(false)} onDelete={async (id: number) => { await deleteEmployee(id); setShowDelete(false); fetchEmployees().then(setEmployees) }} />
    </div>
  )
} 