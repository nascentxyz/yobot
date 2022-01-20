import { supabase } from "."

// ** Fetches a specific project by id ** //
const getProject = async (id: number) => {
  try {
    let { data, error, status } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)

    if (status !== 200) {
      throw error
    }

    return data
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export default getProject;