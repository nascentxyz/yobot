import { supabase } from "."

// ** Fetches all projects ** //
const getProjects = async () => {
  try {
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('projects')
      .select('*')
      // .select(`id, created_at, title, website, description, launch_time, image_src, token_address`)
      // .eq('id', user.id)
      // .single()

    if (status !== 200) {
      throw error
    }

    return data
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export default getProjects;