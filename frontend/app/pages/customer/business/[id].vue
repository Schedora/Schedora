onMounted(async () => { try { // Load business details — public endpoint const
response = await fetch(`http://localhost:3333/api/businesses/${businessId}`)
const data = await response.json() if (data.data) { business.value = {
...data.data, services: [], branches: [], images: [] } } // Load services —
public endpoint no auth needed const servicesRes = await
fetch(`http://localhost:3333/api/businesses/${businessId}/services`) const
servicesData = await servicesRes.json() if (servicesData.data) {
business.value.services = servicesData.data } // Load branches — needs auth
const token = localStorage.getItem('auth_token') ||
localStorage.getItem('token') const branchesRes = await
fetch(`http://localhost:3333/api/businesses/${businessId}/branches`, { headers:
{ Authorization: `Bearer ${token}`, Accept: 'application/json' } }) const
branchesData = await branchesRes.json() if (branchesData.data) {
business.value.branches = branchesData.data } } catch (error) {
console.error('Failed to load business:', error) } finally { loading.value =
false } })
