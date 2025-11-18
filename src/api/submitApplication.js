export async function submitApplication(formData) {
  console.log('Simulando envío de aplicación...');
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
  // Para testear la función, simulamos un retardo
  return new Promise(resolve => setTimeout(resolve, 1000));
}
