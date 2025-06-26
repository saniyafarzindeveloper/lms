

const CompanionsLibrary = async({searchParams}: SearchParams) => {
  const params = await searchParams;
  console.log('PARAMS FROM SEARCH PARMS' , params);
  return (
    <div>CompanionsLibrary</div>
  )
}

export default CompanionsLibrary