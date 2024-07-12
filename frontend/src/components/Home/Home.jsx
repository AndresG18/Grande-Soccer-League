import './Home.css';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';

export default function Home() {
  return (
    <div className="home">

      <div className="home-content">
        <section className="hero">
          <h2>Welcome to Grande Futsal</h2>
          <p>Experience the best indoor futsal for young players and talents.</p>
          <p>Registration Price: $130</p>
          <OpenModalButton
            buttonText="Register Now"
            modalComponent={<SignupFormModal />}
          />
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>Indoor futsal offers a comfortable and cool environment, perfect for both kids to play and parents to watch.</p>
        </section>

        <section id="age-groups" className="age-groups">
          <h2>Age Groups</h2>
          <ul>
            <li>6-8 Years</li>
            <li>9-10 Years</li>
            <li>11-12 Years</li>
          </ul>
        </section>

        <section id="why-choose" className="why-choose">
          <h2>Why Choose Indoor Futsal?</h2>
          <ul>
            <li>Comfortable and Safe Environment: Enjoy futsal in an air-conditioned indoor setting, keeping everyone comfortable and safe from the Arizona heat.</li>
            <li>Parental Convenience: Parents can watch their children play in a secure, indoor environment, without the worry of weather conditions.</li>
            <li>Skill Enhancement: Our program is designed to help kids develop their soccer skills, learn teamwork, and build confidence.</li>
            <li>Fun and Engaging: Indoor futsal is an exciting way for kids to stay active, make friends, and enjoy.</li>
            <li>Professional Coaching: Our experienced coaches are dedicated to teaching the fundamentals of futsal and soccer, ensuring your child receives top-notch training.</li>
            {/* <li>Community Building: Joining our futsal program helps kids become part of a community, fostering friendships and social skills.</li> */}
          </ul>
        </section>

        <section id="program-highlights" className="program-highlights">
          <h2>Program Highlights</h2>
          <ul>
            <li>8 v 8 Games: Our games are structured as 8 vs. 8, ensuring each child gets plenty of playtime and engagement.</li>
            <li>Structured Training Sessions: Each session is carefully planned to maximize skill development and enjoyment.</li>
            <li>Small Team Sizes: Small teams ensure each child gets ample playing time and personalized attention from coaches.</li>
            <li>Competitive Matches: Kids will have the opportunity to participate in matches and tournaments, putting their skills to the test.</li>
          </ul>
        </section>
        <footer className="home-footer">
          <p>Contact us: info@grandefutsal.com</p>
          <div className="social-media-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </footer>
      </div>
    </div>
  );
}