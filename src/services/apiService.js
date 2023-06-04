export async function fetchResourceList() {
    try {
      const response = await fetch('https://engineering-task.elancoapps.com/api/resources');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
}
export async function fetchResourceData(resourceName) {
    try {
      const url = `https://engineering-task.elancoapps.com/api/resources/${resourceName}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
}
export async function fetchApplicationsList() {
    try {
      const url = 'https://engineering-task.elancoapps.com/api/applications';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
}
export async function fetchApplicationData(selectedApplication) {
    try {
      const url = `https://engineering-task.elancoapps.com/api/applications/${selectedApplication}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
}

  
  
  
  
  
  
