const Holidays = require('date-holidays');
const hd = new Holidays();

module.exports = (req, res) => {
  const { country, year } = req.query;

  if (!country || !year) {
    return res.status(400).json({ error: 'Please provide both country and year parameters.' });
  }

  try {
    hd.init(country);
    const holidays = hd.getHolidays(year);

    if (holidays.length === 0) {
      return res.status(404).json({ message: 'No holidays found for the specified country and year.' });
    }

    return res.status(200).json(holidays);
  } catch (error) {
    return res.status(500).json({ error: 'Invalid country code or year format.' });
  }
};
